using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace DiplomskiDezurstvo {
  public class RouteConfig {
    public static void RegisterRoutes(RouteCollection routes) {
      // dodaje / na kraju url-a
      routes.AppendTrailingSlash = true;

      routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

      routes.MapRoute(
            name: "login",
            url: "login/{*catchall}",
            defaults: new { controller = "Home", action = "Login" });

      routes.MapRoute(
          name: "dashboard",
          url: "dashboard/{*catchall}",
          defaults: new { controller = "Home", action = "Dashboard" });

      routes.MapRoute(
        name: "user",
        url: "user/{*catchall}",
        defaults: new { controller = "Home", action = "UserView" });

      routes.MapRoute(
          name: "asistenti",
          url: "asistenti/{*catchall}",
          defaults: new { controller = "Home", action = "Asistenti" });

      routes.MapRoute(
        name: "predmeti",
        url: "predmeti/{*catchall}",
        defaults: new { controller = "Home", action = "Predmeti" });

      routes.MapRoute(
        name: "sale",
        url: "sale/{*catchall}",
        defaults: new { controller = "Home", action = "Sale" });
      
      routes.MapRoute(
        name: "rasporedi",
        url: "rasporedi/{*catchall}",
        defaults: new { controller = "Home", action = "Rasporedi" });

      routes.MapRoute(
        name: "izvestaj",
        url: "izvestaj/{*catchall}",
        defaults: new { controller = "Home", action = "Izvestaj" });

      routes.MapRoute(
        name: "profil",
        url: "profil/{*catchall}",
        defaults: new { controller = "Home", action = "Profil" });

      routes.MapMvcAttributeRoutes();

      routes.MapRoute(
          name: "Default",
          url: "{controller}/{action}/{id}",
          defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
      );
    }
  }
}
