using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiplomskiDezurstvo.Controllers {
  public class HomeController : Controller {
    public ActionResult Index()
    {
        return View();
    }

    [AllowAnonymous]
    public ActionResult Login()
    {
        return View();
    }

    [Authorize]
    public ActionResult Dashboard()
    {
        if (User.IsInRole("Admin"))
        {
            return View();
        }
        else
        {
            return View("UserView");
        }
    }

    [Authorize]
    public ActionResult UserView()
    {
        return View();
    }

    [Authorize(Roles = "Admin")]
    public ActionResult Asistenti()
    {
        return View();
    }

    [Authorize(Roles = "Admin")]
    public ActionResult Predmeti()
    {
        return View();
    }

    [Authorize(Roles = "Admin")]
    public ActionResult Sale()
    {
        return View();
    }

    [Authorize(Roles = "Admin")]
    public ActionResult Rasporedi()
    {
        return View();
    }

    [Authorize(Roles = "Admin")]
    public ActionResult Izvestaj()
    {
        return View();
    }

    [Authorize]
    public ActionResult Profil()
    {
        return View();
    }
  }
}
