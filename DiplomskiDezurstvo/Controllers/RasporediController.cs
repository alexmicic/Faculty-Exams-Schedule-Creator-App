using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using DiplomskiDezurstvo.Models;
using System.Threading.Tasks;

namespace DiplomskiDezurstvo.Controllers
{
    [Authorize(Roles = "Admin")]
    public class RasporediController : ApiController
    {
        private DiplomskiDezurstvoEntities db = new DiplomskiDezurstvoEntities();

        // GET: api/Rasporedi
        public IQueryable<Rasporedi> GetRasporedis()
        {
            return db.Rasporedis;
        }

        // GET: api/Rasporedi
        /*public IEnumerable<RasporediViewModels> GetRasporedis()
        {
            return from p in db.Rasporedis
                   select new RasporediViewModels
                   {
                       RasporedID = p.RasporedID,
                       Naziv = p.Naziv
                   };
        }*/


        // GET: api/Rasporedi/5
        [ResponseType(typeof(Rasporedi))]
        public IHttpActionResult GetRasporedi(int id)
        {
            Rasporedi rasporedi = db.Rasporedis.Find(id);
            if (rasporedi == null)
            {
                return NotFound();
            }

            return Ok(rasporedi);
        }

        // PUT: api/Rasporedi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRasporedi(int id, Rasporedi rasporedi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rasporedi.RasporedID)
            {
                return BadRequest();
            }

            db.Entry(rasporedi).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RasporediExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Rasporedi
        [ResponseType(typeof(Rasporedi))]
        public IHttpActionResult PostRasporedi(Rasporedi rasporedi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Rasporedis.Add(rasporedi);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = rasporedi.RasporedID }, rasporedi);
        }

        // DELETE: api/Rasporedi/5
        [ResponseType(typeof(Rasporedi))]
        public IHttpActionResult DeleteRasporedi(int id)
        {
            Rasporedi rasporedi = db.Rasporedis.Find(id);
            if (rasporedi == null)
            {
                return NotFound();
            }

            db.Rasporedis.Remove(rasporedi);
            db.SaveChanges();

            return Ok(rasporedi);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RasporediExists(int id)
        {
            return db.Rasporedis.Count(e => e.RasporedID == id) > 0;
        }

        [ActionName("Send")]
        public async Task NotifyUsers(string action, int idRaspored)
        {
            // ako je akcija 'send'
            if (action == "send")
            {
                // kreiraj novi objekat klase EmailService za slanje mejla
                EmailService email = new EmailService();
                
                // pronadji samo one asistente koji pripadaju ovom rasporedu 
                // i posalji podatke o datumu i sali 
                var asistenti = from r in db.Rasporeds
                                join ra in db.RasporedAsistentis on r.RasporedID equals ra.RasporedID
                                join a in db.Asistentis on ra.AsistentID equals a.AsistentID
                                join rs in db.RasporedSales on ra.RasporedID equals rs.RasporedID
                                join s in db.Sales on rs.SalaID equals s.SalaID
                                where r.RasporedMainID == idRaspored
                                orderby a.AsistentID
                                select new
                                {
                                    AsistentID = a.AsistentID,
                                    Email = a.Email,
                                    Datum = r.Datum,
                                    Sala = s.Naziv
                                };

                // pomocne promenljive za foreach petlju
                int temp = asistenti.First().AsistentID;
                string tempEmail = asistenti.First().Email;

                // elementi email poruke
                string subject = "Predstojeće aktivnosti";
                string body = "<p>Vaša sledeća dežurstva su:</p>";
                string bodycontent = "";

                // brojac i ukupan broj nadjenih asistenata
                int counter = 0;
                int full = asistenti.Count();

                // prodji kroz listu asistenata
                foreach (var asistent in asistenti)
                {
                Provera:
                    // ako jeste onda ucitaj podatke
                    if (asistent.AsistentID == temp)
                    {
                        // dodaj informacije i idi na End
                        bodycontent += "<p><strong>Datum:</strong> " + asistent.Datum + "  -  <strong>Sala:</strong> " + asistent.Sala + "</p>";
                        goto End;
                    }
                    // ako nije
                    // posalji email sa podacima
                    await email.SendEmail(tempEmail, subject, (body + bodycontent), null);
                    // postavi temp na nove vrednosti
                    temp = asistent.AsistentID;
                    tempEmail = asistent.Email;
                    bodycontent = "";
                    // vrati se na proveru
                    goto Provera;
                End:
                    counter++;
                    if (counter == full)
                    {
                        // posalji email
                        await email.SendEmail(tempEmail, subject, (body + bodycontent), null);
                        // postavi temp na nove vrednosti
                        temp = asistent.AsistentID;
                        tempEmail = asistent.Email;
                        bodycontent = "";
                    }
                    else
                    {
                        continue;
                    }
                }
            }
        }
    }
}