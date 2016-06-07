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
    public class IzvestajController : ApiController
    {
        private DiplomskiDezurstvoEntities db = new DiplomskiDezurstvoEntities();

        // GET: api/Izvestaj
        public IQueryable<ViewUkupanBrojDezurstva> GetViewUkupanBrojDezurstvas()
        {
            return db.ViewUkupanBrojDezurstvas;
        }

        // GET: api/Izvestaj/5
        [ResponseType(typeof(ViewUkupanBrojDezurstva))]
        public IHttpActionResult GetViewUkupanBrojDezurstva(int id)
        {
            ViewUkupanBrojDezurstva viewUkupanBrojDezurstva = db.ViewUkupanBrojDezurstvas.Find(id);
            if (viewUkupanBrojDezurstva == null)
            {
                return NotFound();
            }

            return Ok(viewUkupanBrojDezurstva);
        }

        // PUT: api/Izvestaj/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutViewUkupanBrojDezurstva(int id, ViewUkupanBrojDezurstva viewUkupanBrojDezurstva)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != viewUkupanBrojDezurstva.AsistentID)
            {
                return BadRequest();
            }

            db.Entry(viewUkupanBrojDezurstva).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ViewUkupanBrojDezurstvaExists(id))
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

        // POST: api/Izvestaj
        [ResponseType(typeof(ViewUkupanBrojDezurstva))]
        public IHttpActionResult PostViewUkupanBrojDezurstva(ViewUkupanBrojDezurstva viewUkupanBrojDezurstva)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ViewUkupanBrojDezurstvas.Add(viewUkupanBrojDezurstva);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ViewUkupanBrojDezurstvaExists(viewUkupanBrojDezurstva.AsistentID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = viewUkupanBrojDezurstva.AsistentID }, viewUkupanBrojDezurstva);
        }

        // DELETE: api/Izvestaj/5
        [ResponseType(typeof(ViewUkupanBrojDezurstva))]
        public IHttpActionResult DeleteViewUkupanBrojDezurstva(int id)
        {
            ViewUkupanBrojDezurstva viewUkupanBrojDezurstva = db.ViewUkupanBrojDezurstvas.Find(id);
            if (viewUkupanBrojDezurstva == null)
            {
                return NotFound();
            }

            db.ViewUkupanBrojDezurstvas.Remove(viewUkupanBrojDezurstva);
            db.SaveChanges();

            return Ok(viewUkupanBrojDezurstva);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ViewUkupanBrojDezurstvaExists(int id)
        {
            return db.ViewUkupanBrojDezurstvas.Count(e => e.AsistentID == id) > 0;
        }
    }
}