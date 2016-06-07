using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DiplomskiDezurstvo.Models
{
    public class PredmetiViewModels
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PredmetiViewModels()
        {
            this.RasporedPredmeti = new HashSet<RasporedPredmetiViewModels>();
        }
    
        public int PredmetID { get; set; }
        public string Naziv { get; set; }

        [JsonIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RasporedPredmetiViewModels> RasporedPredmeti { get; set; }
    }
}