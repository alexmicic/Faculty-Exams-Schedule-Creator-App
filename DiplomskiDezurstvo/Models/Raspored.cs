//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DiplomskiDezurstvo.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Raspored
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Raspored()
        {
            this.RasporedAsistenti = new HashSet<RasporedAsistenti>();
            this.RasporedPredmeti = new HashSet<RasporedPredmeti>();
            this.RasporedSale = new HashSet<RasporedSale>();
        }
    
        public int RasporedID { get; set; }
        public int RasporedMainID { get; set; }
        public System.DateTime Datum { get; set; }
    
        public virtual Rasporedi Rasporedi { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RasporedAsistenti> RasporedAsistenti { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RasporedPredmeti> RasporedPredmeti { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RasporedSale> RasporedSale { get; set; }
    }
}
