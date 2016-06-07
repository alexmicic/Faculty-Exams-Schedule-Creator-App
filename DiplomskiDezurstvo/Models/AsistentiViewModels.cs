using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DiplomskiDezurstvo.Models
{
    public class AsistentiViewModels
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public AsistentiViewModels()
        {
            this.RasporedAsistenti = new HashSet<RasporedAsistentiViewModels>();
        }
    
        public int AsistentID { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public string Sifra { get; set; }
        public string Telefon { get; set; }

        [JsonIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RasporedAsistentiViewModels> RasporedAsistenti { get; set; }
    }

    public class CantMakeItViewModel
    {
        public int AsistentID { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Poruka { get; set; }
    }
}