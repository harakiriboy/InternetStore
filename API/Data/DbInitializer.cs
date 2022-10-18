using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName= "Bob",
                    Email = "bob@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName= "Admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new [] {"Member", "Admin"});
            }            

            if (context.Products.Any()) return;

            var products = new List<Product> {
                new Product
                {
                    Name = "Zara Matte Lipstick",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 20000,
                    PictureUrl = "/images/products2/lip-zara1.png", //sb-ang1.png
                    Brand = "Zara", // - Zara Angular
                    Type = "Lipsticks", // - Lipstick 2000 Boards
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Zara Moss Lipstick",
                    Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.",
                    Price = 15000,
                    PictureUrl = "/images/products2/lip-zara2.png", //sb-ang2.png
                    Brand = "Zara", // - Zara Angular
                    Type = "Lipsticks", // - Lipstick 3000 Boards
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Dior Frosted Lipstick",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products2/lip-dior1.png", //sb-core1.png
                    Brand = "Dior", // - Dior NetCore
                    Type = "Lipsticks", // - Lipstick 3 Boards
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Dior Lip Liner Lipstick",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 30000,
                    PictureUrl = "/images/products2/lip-dior2.png", //sb-core2.png
                    Brand = "Dior", // - Dior NetCore
                    Type = "Lipsticks", // - Lipstick Boards
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Waikiki Glossy Lipstick",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 25000,
                    PictureUrl = "/images/products2/lip-waikiki1.png", //sb-react1.png
                    Brand = "Waikiki", // - Waikiki React
                    Type = "Lipsticks", // - Lipstick Boards
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Guerlan Matte Lipstick",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 12000,
                    PictureUrl = "/images/products2/lip-guerlan1.png", //sb-ts1.png
                    Brand = "Guerlan", // - Guerlan TypeScript
                    Type = "Lipsticks", // - Lipstick Boards
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Dior Hair Powder",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1000,
                    PictureUrl = "/images/products2/pow-dior1.png", //hat-core1.png
                    Brand = "Dior", // - Dior NetCore
                    Type = "Powders", // - Powder Hats
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Waikiki Hair Powder",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 8000,
                    PictureUrl = "/images/products2/pow-waikiki1.png", //hat-react1.png
                    Brand = "Waikiki", // - Waikiki React
                    Type = "Powders", // - Powder Hats
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Waikiki Face Powder",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products2/pow-waikiki2.png", //hat-react2.png
                    Brand = "Waikiki", // - Waikiki React
                    Type = "Powders", // - Powder Hats
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Maybellin Toilette Parfume",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1800,
                    PictureUrl = "/images/products2/parf-maybelline1.png", //glove-code1.png
                    Brand = "Maybelline", // - Maybelline VS Code
                    Type = "Parfumes", // - Parfume Gloves
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Maybelline Cologne Parfume",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1500,
                    PictureUrl = "/images/products2/parf-maybelline2.png", //glove-code2.png
                    Brand = "Maybelline", // - Maybelline VS Code
                    Type = "Parfumes", // - Parfume Gloves
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Waikiki Womens Parfume",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1600,
                    PictureUrl = "/images/products2/parf-waikiki1.png", //glove-react1.png
                    Brand = "Waikiki", // - Waikiki React
                    Type = "Parfumes", // - Parfumes Gloves
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Waikiki Mens Parfume",
                    Description =
                        "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 1400,
                    PictureUrl = "/images/products2/parf-waikiki2.png", //glove-react2.png
                    Brand = "Waikiki", // - Waikiki React
                    Type = "Parfumes", // - Parfumes Gloves
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Chanel Moss Gel",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 25000,
                    PictureUrl = "/images/products2/gel-chanel1.png", //boot-redis1.png
                    Brand = "Chanel", // - Chanel Redis
                    Type = "Gels", // - Gel Boots
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Dior Shower Gel",
                    Description =
                        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
                    Price = 18999,
                    PictureUrl = "/images/products2/gel-dior2.png", //boot-core2.png
                    Brand = "Dior", // - Dior NetCore
                    Type = "Gels", // - Gel Boots
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Dior Body Gel",
                    Description =
                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
                    Price = 19999,
                    PictureUrl = "/images/products2/gel-dior1.png", //boot-core1.png
                    Brand = "Dior", // - Dior NetCore
                    Type = "Gels", // - Gel Boots
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Zara Moss Gel",
                    Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
                    Price = 15000,
                    PictureUrl = "/images/products2/gel-zara2.png", //boot-ang2.png
                    Brand = "Zara", // - Zara Angular
                    Type = "Gels", // - Gel Boots
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Zara Shower Gel",
                    Description =
                        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
                    Price = 18000,
                    PictureUrl = "/images/products2/gel-zara1.png", //boot-ang1.png
                    Brand = "Zara", // - Zara Angular
                    Type = "Gels", // - Gel Boots
                    QuantityInStock = 100
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            } 
            context.SaveChanges();
        }
    }
}