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
    [Authorize]
    public class UserController : ApiController
    {
        private DiplomskiDezurstvoEntities db = new DiplomskiDezurstvoEntities();

        // GET: api/User
        /*public IQueryable<ViewUserAktivnosti> GetViewUserAktivnostis()
        {
            return db.ViewUserAktivnostis;
        }*/
        public IQueryable<ViewUserAktivnosti> GetViewUserAktivnostis()
        {
            // nadji email prijavljenog korisnika
            var activeUserEmail = User.Identity.Name;
            // na osnovu emaila selektuj asistenta iz baze
            var asistenti = db.Asistentis.Single(i => i.Email == activeUserEmail);
            // za selektovanog asistenta izvuci ID
            int asistentID = asistenti.AsistentID;
            // vrati sve aktivnosti za izabranog asistenta
            return db.ViewUserAktivnostis.Where(i => i.AsistentID == asistentID);
        }

        // GET: api/User/5
        [ResponseType(typeof(ViewUserAktivnosti))]
        public IHttpActionResult GetViewUserAktivnosti(int id)
        {
            ViewUserAktivnosti viewUserAktivnosti = db.ViewUserAktivnostis.Find(id);
            if (viewUserAktivnosti == null)
            {
                return NotFound();
            }

            return Ok(viewUserAktivnosti);
        }

        // POST: api/User/action='switch'
        [ActionName("Switch")]
        public async Task Switch(string action, CantMakeItViewModel model)
        {
            // ako je akcija 'switch'
            if (action == "switch")
            {
                // kreiraj novi objekat klase EmailService za slanje email
                EmailService email = new EmailService();

                // pronadji admin korisnika
                var admin = from a in db.AspNetUsers
                           where a.IsAdmin == 1
                           select new
                           {
                               adminEmail = a.UserName
                           };

                // dodaj admin email u string
                string adminEmail = admin.Single().adminEmail;

                // pronadji korisnika koji salje email
                var user = from a in db.Asistentis
                           where model.AsistentID == a.AsistentID
                           select new
                           {
                               userEmail = a.Email
                           };

                // dodaj korisnik email u string
                string userEmail = user.Single().userEmail;

                // predmet i telo poruke
                string subject = "Izmena u rasporedu";
                string body = "<p>Asistent <strong>" + model.Ime + " " + model.Prezime + "</strong> vam je poslao/la poruku:</p>";
                body += "<p>" + model.Poruka + "</p>";

                // posalji email
                await email.SendEmail(adminEmail, subject, body, userEmail);
            }
        }

        // PUT: api/User/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutViewUserAktivnosti(int id, ViewUserAktivnosti viewUserAktivnosti)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != viewUserAktivnosti.AsistentID)
            {
                return BadRequest();
            }

            db.Entry(viewUserAktivnosti).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ViewUserAktivnostiExists(id))
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

        // POST: api/User
        [ResponseType(typeof(ViewUserAktivnosti))]
        public IHttpActionResult PostViewUserAktivnosti(ViewUserAktivnosti viewUserAktivnosti)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ViewUserAktivnostis.Add(viewUserAktivnosti);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ViewUserAktivnostiExists(viewUserAktivnosti.AsistentID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = viewUserAktivnosti.AsistentID }, viewUserAktivnosti);
        }

        // DELETE: api/User/5
        [ResponseType(typeof(ViewUserAktivnosti))]
        public IHttpActionResult DeleteViewUserAktivnosti(int id)
        {
            ViewUserAktivnosti viewUserAktivnosti = db.ViewUserAktivnostis.Find(id);
            if (viewUserAktivnosti == null)
            {
                return NotFound();
            }

            db.ViewUserAktivnostis.Remove(viewUserAktivnosti);
            db.SaveChanges();

            return Ok(viewUserAktivnosti);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ViewUserAktivnostiExists(int id)
        {
            return db.ViewUserAktivnostis.Count(e => e.AsistentID == id) > 0;
        }
    }
}