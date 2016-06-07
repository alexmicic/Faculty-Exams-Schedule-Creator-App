using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DiplomskiDezurstvo.Models
{
    public class RasporedSaleViewModels
    {
        public int Id { get; set; }
        public int RasporedID { get; set; }
        public int SalaID { get; set; }

        public virtual RasporedViewModels Raspored { get; set; }
        [JsonIgnore]
        public virtual SaleViewModels Sale { get; set; }
    }
}