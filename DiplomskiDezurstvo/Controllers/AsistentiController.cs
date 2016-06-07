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
    [Authorize(Roles="Admin")]
    public class AsistentiController : ApiController
    {
        private DiplomskiDezurstvoEntities db = new DiplomskiDezurstvoEntities();

        // GET: api/Asistenti
        public IQueryable<Asistenti> GetAsistentis()
        {
            return db.Asistentis;
        }

        // GET: api/Asistenti
        /*public IEnumerable<AsistentiViewModels> GetAsistentis()
        {
            return from p in db.Asistentis
                select new AsistentiViewModels
                {
                    AsistentID = p.AsistentID,
                    Ime = p.Ime,
                    Prezime = p.Prezime,
                    Email = p.Email,
                    Telefon = p.Telefon
                };
        }*/

        // GET: api/Asistenti/5
        [ResponseType(typeof(Asistenti))]
        public IHttpActionResult GetAsistenti(int id)
        {
            Asistenti asistenti = db.Asistentis.Find(id);
            if (asistenti == null)
            {
                return NotFound();
            }

            return Ok(asistenti);
        }

        // PUT: api/Asistenti/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAsistenti(int id, Asistenti asistenti)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != asistenti.AsistentID)
            {
                return BadRequest();
            }

            db.Entry(asistenti).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AsistentiExists(id))
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

        // POST: api/Asistenti
        [ResponseType(typeof(Asistenti))]
        public IHttpActionResult PostAsistenti(Asistenti asistenti)
        {
            // ako poslata struktura nije dobra vrati gresku
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // dodaj novog asistenta u bazu
            db.Asistentis.Add(asistenti);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = asistenti.AsistentID }, asistenti);
        }

        // DELETE: api/Asistenti/5
        [ResponseType(typeof(Asistenti))]
        public IHttpActionResult DeleteAsistenti(int id)
        {
            Asistenti asistenti = db.Asistentis.Find(id);

            //Obrisati i iz User tabele
            String EmailUser = asistenti.Email;
            //System.Diagnostics.Debug.Write(EmailUser);
            AspNetUser user = db.AspNetUsers.SingleOrDefault(i => i.Email == EmailUser);
            //System.Diagnostics.Debug.Write(user.Id);
            //Obrisati i iz User tabele

            if (asistenti == null)
            {
                return NotFound();
            }

            db.Asistentis.Remove(asistenti);
            
            //Obrisati i iz User tabele
            db.AspNetUsers.Remove(user);
            //Obrisati i iz User tabele

            db.SaveChanges();

            return Ok(asistenti);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AsistentiExists(int id)
        {
            return db.Asistentis.Count(e => e.AsistentID == id) > 0;
        }
    }
}