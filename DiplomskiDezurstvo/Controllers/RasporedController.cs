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

namespace DiplomskiDezurstvo.Controllers
{
    [Authorize(Roles = "Admin")]
    public class RasporedController : ApiController
    {
        private DiplomskiDezurstvoEntities db = new DiplomskiDezurstvoEntities();

        // GET: api/Raspored
        public IQueryable<Raspored> GetRasporeds()
        {
            return db.Rasporeds;
        }

        // GET: api/Raspored/Single5
        [ResponseType(typeof(Raspored))]
        public IHttpActionResult GetRasporedSingle(string single, int singleId)
        {
            Raspored raspored = db.Rasporeds.Find(singleId);
            if (raspored == null)
            {
                return NotFound();
            }

            return Ok(raspored);
        }

        // Get: api/Raspored/MainRasporedID
        public IQueryable<Raspored> GetRaspored(int id)
        {
            return db.Rasporeds.Where(i => i.RasporedMainID == id).OrderBy(i => i.Datum);
            /*return from p in db.Rasporeds
                   select new RasporedViewModels
                   {
                       RasporedID = p.RasporedID,
                       RasporedMainID = p.RasporedMainID,
                       Datum = p.Datum,
                       RasporedAsistenti = p.RasporedAsistenti,
                       RasporedPredmeti = p.RasporedSale,
                       RasporedSale = p.RasporedSale
                   };*/
        }

        // PUT: api/Raspored/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRaspored(int id, Raspored raspored)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != raspored.RasporedID)
            {
                return BadRequest();
            }

            db.Entry(raspored).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RasporedExists(id))
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

        // POST: api/Raspored
        [ResponseType(typeof(Raspored))]
        public IHttpActionResult PostRaspored(Raspored raspored)
        {
            // ukoliko poslata struktura nije odgovarajuca vrati gresku
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // provera da li je asistent vec dodeljen nekoj sali u istom danu
            // nova lista asistenata koju treba uneti u bazu
            var asistentiToInsert = from r in raspored.RasporedAsistenti
                                join rs in raspored.RasporedSale on r.RasporedID equals rs.RasporedID
                                select new
                                {
                                    AsistentID = r.AsistentID,
                                    SalaID = rs.SalaID
                                };

            // postojeca lista asistenata u bazi
            var asistentiExist = from r in db.Rasporeds
                                join ra in db.RasporedAsistentis on r.RasporedID equals ra.RasporedID
                                join a in db.Asistentis on ra.AsistentID equals a.AsistentID
                                join rs in db.RasporedSales on ra.RasporedID equals rs.RasporedID
                                join s in db.Sales on rs.SalaID equals s.SalaID
                                where r.Datum == raspored.Datum
                                orderby a.AsistentID
                                select new
                                {
                                    AsistentID = a.AsistentID,
                                    Ime = a.Ime,
                                    Prezime = a.Prezime,
                                    Datum = r.Datum,
                                    SalaID = s.SalaID,
                                    Sala = s.Naziv
                                };

            // za svakog asistenta proveriti da li vec postoji podatak u bazi
            // za isti datum ali za razlicitu salu
            // ukoliko postoji vratiti odgovarajucu poruku
            foreach (var asistentInsert in asistentiToInsert)
            {
                foreach(var asistentExist in asistentiExist){
                    if (asistentInsert.AsistentID == asistentExist.AsistentID &&
                        asistentInsert.SalaID != asistentExist.SalaID &&
                        asistentExist.Datum == raspored.Datum)
                        {
                            return BadRequest("Asistent " + asistentExist.Ime + " " + asistentExist.Prezime + 
                                " je već dodeljen sali " + asistentExist.Sala + " za izabrani datum. Proverite unete podatke.");
                        }
                }
            }

            db.Rasporeds.Add(raspored);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = raspored.RasporedID }, raspored);
        }

        // DELETE: api/Raspored/5
        [ResponseType(typeof(Raspored))]
        public IHttpActionResult DeleteRaspored(int id)
        {
            Raspored raspored = db.Rasporeds.Find(id);
            if (raspored == null)
            {
                return NotFound();
            }

            db.Rasporeds.Remove(raspored);
            db.SaveChanges();

            return Ok(raspored);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RasporedExists(int id)
        {
            return db.Rasporeds.Count(e => e.RasporedID == id) > 0;
        }
    }
}