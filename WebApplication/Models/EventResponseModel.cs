﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.DataAccess.EfModels;

namespace WebApplication.Models
{
    public class EventResponseModel
    {
        public long Id { get; set; }
        public string eventHash { get; set; }
        public IEnumerable<CategoryResponseModel> categories { get; set; }

        public EventResponseModel(long Id, string eventHash)
        {
            this.Id = Id;
            this.eventHash = eventHash;
        }
        public void AddCategory(string name, List<Item> items)
        {
            var category = new CategoryResponseModel(name, items);
            categories.Append(category);
        }
    }

    public class CategoryResponseModel
    {
        public string name { get; set; }
        public IEnumerable<Item> items { get; set; }

        public CategoryResponseModel(string name, List<Item> items)
        {
            this.name = name;
            this.items = items;
        }
    }
}