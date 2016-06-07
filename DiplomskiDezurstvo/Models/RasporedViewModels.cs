using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DiplomskiDezurstvo.Models
{
    public class RasporedViewModels
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public RasporedViewModels()
        {
            this.RasporedAsistenti = new HashSet<RasporedAsistentiViewModels>();
            this.RasporedPredmeti = new HashSet<RasporedPredmetiViewModels>();
            this.RasporedSale = new HashSet<RasporedSaleViewModels>();
        }
    
        public int RasporedID { get; set; }
        public int RasporedMainID { get; set; }
        public System.DateTime Datum { get; set; }
    
        public virtual RasporediViewModels Rasporedi { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RasporedAsistentiViewModels> RasporedAsistenti { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RasporedPredmetiViewModels> RasporedPredmeti { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RasporedSaleViewModels> RasporedSale { get; set; }
    }
}