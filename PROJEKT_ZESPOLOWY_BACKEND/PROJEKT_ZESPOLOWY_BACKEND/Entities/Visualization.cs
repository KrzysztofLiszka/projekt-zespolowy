using System.Text.Json.Serialization;

namespace PROJEKT_ZESPOLOWY_BACKEND.Entities
{
    public class Visualization : BaseEntity
    {
        public string Name { get; set; } = string.Empty;

        [JsonIgnore]
        public List<Image>? Images { get; set; } = new List<Image>();
    }
}
