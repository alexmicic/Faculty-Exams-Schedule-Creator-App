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
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    
    public partial class RasporedAsistenti
    {
        public int Id { get; set; }
        public int RasporedID { get; set; }
        public int AsistentID { get; set; }
    
        public virtual Asistenti Asistenti { get; set; }
        [JsonIgnore]
        public virtual Raspored Raspored { get; set; }
    }
}
