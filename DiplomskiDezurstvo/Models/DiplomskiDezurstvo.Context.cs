﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DiplomskiDezurstvoEntities : DbContext
    {
        public DiplomskiDezurstvoEntities()
            : base("name=DiplomskiDezurstvoEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
        public virtual DbSet<Asistenti> Asistentis { get; set; }
        public virtual DbSet<AspNetRole> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<Predmeti> Predmetis { get; set; }
        public virtual DbSet<Sale> Sales { get; set; }
        public virtual DbSet<Raspored> Rasporeds { get; set; }
        public virtual DbSet<Rasporedi> Rasporedis { get; set; }
        public virtual DbSet<RasporedAsistenti> RasporedAsistentis { get; set; }
        public virtual DbSet<RasporedPredmeti> RasporedPredmetis { get; set; }
        public virtual DbSet<RasporedSale> RasporedSales { get; set; }
        public virtual DbSet<ViewUkupanBrojDezurstva> ViewUkupanBrojDezurstvas { get; set; }
        public virtual DbSet<ViewUserAktivnosti> ViewUserAktivnostis { get; set; }
    }
}
