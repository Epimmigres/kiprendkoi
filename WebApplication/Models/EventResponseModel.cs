using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using WebApplication.DataAccess.EfModels;

namespace WebApplication.Models
{
    public class EventResponseModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? Date { get; set; }
        public string Location { get; set; }
        public string eventHash { get; set; }
        public List<CategoryResponseModel> categories { get; set; }

        public EventResponseModel(long Id, string eventHash, string name, string location, string description, DateTime? date)
        {
            this.Id = Id;
            this.Name = name;
            this.Description = description;
            this.Date = date;
            this.Location = location;
            this.eventHash = eventHash;
            this.categories = new List<CategoryResponseModel>();
        }
        public void AddCategory(long id, string name, List<Item> items)
        {
            var category = new CategoryResponseModel(id, name, items);
            categories.Add(category);
        }
    }

    public class CategoryResponseModel
    {
        public long Id { get; set; }
        public string name { get; set; }
        [JsonIgnore]
        public IEnumerable<Item> items { get; set; }

        public CategoryResponseModel(long id, string name, List<Item> items)
        {
            Id = id;
            this.name = name;
            this.items = items;
        }
    }
}
