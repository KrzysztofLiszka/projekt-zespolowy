using PROJEKT_ZESPOLOWY_BACKEND.Constants;
using PROJEKT_ZESPOLOWY_BACKEND.Data;
using PROJEKT_ZESPOLOWY_BACKEND.Entities;
using PROJEKT_ZESPOLOWY_BACKEND.SqlRepository;
using System;
using System.Xml.Linq;

namespace PROJEKT_ZESPOLOWY_BACKEND.Controllers
{
    public class DatabaseSeeder
    {
        private readonly ISqlRepository _sqlRepository;
        private readonly ApplicationDbContext _applicationDbContext;

        public DatabaseSeeder(ISqlRepository sqlRepository, ApplicationDbContext applicationDbContext)
        {
            _sqlRepository = sqlRepository;
            _applicationDbContext = applicationDbContext;
        }

        public async Task AddSchedules(int num)
        {
            var sampleUser = _sqlRepository.GetQueryable<User>().FirstOrDefault() ?? throw new Exception("User not found!");
            var random = new Random();
            var schedules = new List<Schedule>();

            for (int i = 0; i <= num; i++)
            {
                var randomDate = DateTime.Now.AddDays(random.Next(-365, 365));
                var randomHour = new TimeSpan(random.Next(0, 24), random.Next(0, 60), 0);

                var newEntity = new Schedule
                {
                    WorkplaceUuid = sampleUser.WorkplaceUuid,
                    Name = Guid.NewGuid().ToString(),
                    Date = randomDate.ToString("yyyy-MM-dd"),
                    Hour = randomHour.ToString(@"hh\:mm"),
                    CreatedBy = sampleUser.Uuid,
                    CreatedAt = DateTime.UtcNow,
                    LastUpdatedAt = DateTime.UtcNow
                };

                schedules.Add(newEntity);
            }
            await _applicationDbContext.Schedules.AddRangeAsync(schedules);
            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task AddVisualizations(int num)
        {
            var sampleUser = _sqlRepository.GetQueryable<User>().FirstOrDefault() ?? throw new Exception("User not found!");
            var visualizations = new List<Visualization>();

            for (int i = 0; i <= num; i++)
            {
                var newEntity = new Visualization
                {
                    WorkplaceUuid = sampleUser.WorkplaceUuid,
                    Name = Guid.NewGuid().ToString(),
                    CreatedBy = sampleUser.Uuid,
                    CreatedAt = DateTime.UtcNow,
                    LastUpdatedAt = DateTime.UtcNow
                };

                visualizations.Add(newEntity);
            }
            await _applicationDbContext.Visualizations.AddRangeAsync(visualizations);
            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task AddWorkplaces(int num)
        {
            var sampleUser = _sqlRepository.GetQueryable<User>().FirstOrDefault() ?? throw new Exception("User not found!");
            var workplaces = new List<Workplace>();

            for (int i = 0; i <= num; i++)
            {
                var newEntity = new Workplace
                {
                    WorkplaceUuid = sampleUser.WorkplaceUuid,
                    Name = Guid.NewGuid().ToString(),
                    CreatedBy = sampleUser.Uuid,
                    CreatedAt = DateTime.UtcNow,
                    LastUpdatedAt = DateTime.UtcNow
                };

                workplaces.Add(newEntity);
            }
            await _applicationDbContext.Workplaces.AddRangeAsync(workplaces);
            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task AddTimeSpents(int num)
        {
            var sampleUser = _sqlRepository.GetQueryable<User>().FirstOrDefault() ?? throw new Exception("User not found!");
            var random = new Random();
            var timeSpents = new List<TimeSpent>();

            for (int i = 0; i <= num; i++)
            {
                uint spentHours = (uint)random.Next(1, 21);
                var newEntity = new TimeSpent
                {
                    WorkplaceUuid = sampleUser.WorkplaceUuid,
                    SpentHours = spentHours,
                    CreatedBy = sampleUser.Uuid,
                    CreatedAt = DateTime.UtcNow,
                    LastUpdatedAt = DateTime.UtcNow
                };

                timeSpents.Add(newEntity);
            }
            await _applicationDbContext.TimeSpents.AddRangeAsync(timeSpents);
            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task AddDocumentations(int num)
        {
            var sampleUser = _sqlRepository.GetQueryable<User>().FirstOrDefault() ?? throw new Exception("User not found!");
            var documentations = new List<Documentation>();

            for (int i = 0; i <= num; i++)
            {
                var newEntity = new Documentation
                {
                    WorkplaceUuid = sampleUser.WorkplaceUuid,
                    Name = Guid.NewGuid().ToString(),
                    DescriptionHtmlContent = "OPIS DOKUMENTACJI!\n .. " + Guid.NewGuid().ToString(),
                    CreatedBy = sampleUser.Uuid,
                    CreatedAt = DateTime.UtcNow,
                    LastUpdatedAt = DateTime.UtcNow
                };

                documentations.Add(newEntity);
            }
            await _applicationDbContext.Documentations.AddRangeAsync(documentations);
            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task AddAssignments(int num)
        {
            var sampleUser = _sqlRepository.GetQueryable<User>().FirstOrDefault() ?? throw new Exception("User not found!");
            var statuses = new[] { "TO_DO", "IN_PROGRESS", "REVIEWED", "DONE" };
            var random = new Random();
            var assignments = new List<Assignment>();

            for (int i = 0; i <= num; i++)
            {
                var newEntity = new Assignment
                {
                    WorkplaceUuid = sampleUser.WorkplaceUuid,
                    Name = Guid.NewGuid().ToString(),
                    Description = "OPIS TASKA!\n .. " + Guid.NewGuid().ToString(),
                    UserId = sampleUser.Uuid,
                    Status = statuses[random.Next(statuses.Length)],
                    CreatedBy = sampleUser.Uuid,
                    CreatedAt = DateTime.UtcNow,
                    LastUpdatedAt = DateTime.UtcNow
                };

                assignments.Add(newEntity);
            }
            await _applicationDbContext.Assignments.AddRangeAsync(assignments);
            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task AddUsers(int num)
        {
            var sampleUser = _sqlRepository.GetQueryable<User>().FirstOrDefault() ?? throw new Exception("User not found!");
            var roles = new[] { Roles.WorkspaceOwner, Roles.Accountant, Roles.Worker };
            var random = new Random();
            var users = new List<User>();

            for (int i = 0; i <= num; i++)
            {
                var newEntity = new User
                {
                    WorkplaceUuid = sampleUser.WorkplaceUuid,
                    Email = Guid.NewGuid().ToString() + "@wp.pl",
                    Name = Guid.NewGuid().ToString(),
                    Surname = Guid.NewGuid().ToString(),
                    RoleName = roles[random.Next(roles.Length)],
                    HourlyRate = Math.Round(random.NextDouble() * (100 - 20) + 20, 2),
                    PasswordHash = "5a1b3992ca45a14324d36edfb9ee85d6e4e32f144654e93663de1132a103a102",
                    CreatedAt = DateTime.UtcNow,
                    LastUpdatedAt = DateTime.UtcNow
                };

                users.Add(newEntity);
            }
            await _applicationDbContext.Users.AddRangeAsync(users);
            await _applicationDbContext.SaveChangesAsync();
        }
    }
}
