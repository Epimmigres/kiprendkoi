using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

#nullable disable

namespace WebApplication.DataAccess.EfModels
{
    public class Credentials
    {
        public string username;
        public string password;
    }
    public partial class kiprendkoiContext : DbContext
    {
        public kiprendkoiContext()
        {
        }

        public kiprendkoiContext(DbContextOptions<kiprendkoiContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<Item> Items { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string jsonCreds = File.ReadAllText("./creds.json");
                Credentials creds = JsonConvert.DeserializeObject<Credentials>(jsonCreds);

                optionsBuilder.UseSqlServer("Server=tcp:kiprendquoiserver.database.windows.net,1433;Initial Catalog=kiprendquoi;Persist Security Info=False;User ID=" + creds.username +
                                            ";Password=" + creds.password + ";MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.HasAnnotation("Relational:Collation", "French_CI_AS");

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EventId).HasColumnName("eventId");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.Categories)
                    .HasForeignKey(d => d.EventId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Categories_Events");
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.ToTable("Events");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.Description)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.EventHash)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("eventHash");

                entity.Property(e => e.Location)
                    .IsUnicode(false)
                    .HasColumnName("location");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CategoryId).HasColumnName("categoryId");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.What)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("what")
                    .IsFixedLength(false);

                entity.Property(e => e.Who)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("who")
                    .IsFixedLength(false);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Items)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_Items_Categories");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
