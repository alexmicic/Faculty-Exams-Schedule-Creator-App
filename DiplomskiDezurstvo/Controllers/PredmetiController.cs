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
    public class PredmetiController : ApiController
    {
        private DiplomskiDezurstvoEntities db = new DiplomskiDezurstvoEntities();

        // GET: api/Predmeti
        public IQueryable<Predmeti> GetPredmetis()
        {
            // vrati sve predmeti iz baze
            return db.Predmetis;
        }

        // GET: api/Predmeti
        /*public IEnumerable<PredmetiViewModels> GetPredmetis()
        {
            return from p in db.Predmetis
                   select new PredmetiViewModels
                   {
                       PredmetID = p.PredmetID,
                       Naziv = p.Naziv
                   };
        }*/

        // GET: api/Predmeti/5
        [ResponseType(typeof(Predmeti))]
        public IHttpActionResult GetPredmeti(int id)
        {
            // ucitaj podatke o predmetu sa poslatim id-jem
            Predmeti predmeti = db.Predmetis.Find(id);
            // ukoliko ne postoji vrati gresku
            if (predmeti == null)
            {
                return NotFound();
            }
            // ukoliko postoji vrati predmet
            return Ok(predmeti);
        }

        // PUT: api/Predmeti/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPredmeti(int id, Predmeti predmeti)
        {
            // ukoliko poslata struktura nije odgovarajuca vrati gresku
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // ukoliko id predmeta ne postoji vrati gresku
            if (id != predmeti.PredmetID)
            {
                return BadRequest();
            }

            // ukoliko je sve kako treba postavi state na modified
            db.Entry(predmeti).State = EntityState.Modified;

            try
            {
                // sacuvaj izmene
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                // ako ne postoji vrati gresku
                if (!PredmetiExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // vrati podatak da li je ubacen ili je greska
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Predmeti
        [ResponseType(typeof(Predmeti))]
        public IHttpActionResult PostPredmeti(Predmeti predmeti)
        {
            // ako je poslata struktura losa, vrati gresku
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // ako je sve kako treba dodaj predmet
            db.Predmetis.Add(predmeti);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = predmeti.PredmetID }, predmeti);
        }

        // DELETE: api/Predmeti/5
        [ResponseType(typeof(Predmeti))]
        public IHttpActionResult DeletePredmeti(int id)
        {
            // kreiraj objekat Predmeti
            Predmeti predmeti = db.Predmetis.Find(id);
            // ukoliko ne postoji vrati gresku
            if (predmeti == null)
            {
                return NotFound();
            }
            // obrisi objekat iz baze
            db.Predmetis.Remove(predmeti);
            db.SaveChanges();

            return Ok(predmeti);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PredmetiExists(int id)
        {
            return db.Predmetis.Count(e => e.PredmetID == id) > 0;
        }
    }
}