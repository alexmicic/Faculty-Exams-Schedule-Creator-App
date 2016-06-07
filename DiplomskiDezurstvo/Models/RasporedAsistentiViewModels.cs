using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DiplomskiDezurstvo.Models
{
    public class RasporedAsistentiViewModels
    {
        public int Id { get; set; }
        public int RasporedID { get; set; }
        public int AsistentID { get; set; }

        public virtual AsistentiViewModels Asistenti { get; set; }
        [JsonIgnore]
        public virtual RasporedViewModels Raspored { get; set; }
    }
}