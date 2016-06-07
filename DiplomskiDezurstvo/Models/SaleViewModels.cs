using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DiplomskiDezurstvo.Models
{
    public class SaleViewModels
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SaleViewModels()
        {
            this.RasporedSale = new HashSet<RasporedSaleViewModels>();
        }
    
        public int SalaID { get; set; }
        public string Naziv { get; set; }

        [JsonIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RasporedSaleViewModels> RasporedSale { get; set; }
    }
}