using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DiplomskiDezurstvo.Models
{
    public class RasporedPredmetiViewModels
    {
        public int Id { get; set; }
        public int RasporedID { get; set; }
        public int PredmetID { get; set; }

        public virtual PredmetiViewModels Predmeti { get; set; }
        [JsonIgnore]
        public virtual RasporedViewModels Raspored { get; set; }
    }
}