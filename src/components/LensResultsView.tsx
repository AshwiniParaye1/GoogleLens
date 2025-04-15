
import { useAppContext } from "@/context/AppContext";
import { searchResults } from "@/data/mockData";
import { ArrowLeft, Share2, MoreVertical, Search } from "lucide-react";
import { Link } from "react-router-dom";

const LensResultsView = () => {
  const { selectedImage } = useAppContext();

  if (!selectedImage) {
    return (
      <div className="p-8 text-center text-white">
        <p>No image selected. Please go back and select an image.</p>
        <Link to="/lens" className="text-google-blue underline mt-4 block">
          Go to Lens
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <div className="sticky top-0 bg-google-dark z-10">
        <div className="flex items-center justify-between p-4">
          <Link to="/lens">
            <ArrowLeft className="text-white" size={24} />
          </Link>
          <div className="flex gap-4">
            <button>
              <Share2 className="text-white" size={22} />
            </button>
            <button>
              <MoreVertical className="text-white" size={22} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="search-bar bg-google-card/50 py-2">
              <Search className="text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search with this image"
                className="bg-transparent outline-none flex-1 text-white text-sm"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto px-4 pb-2">
          <div className="flex gap-2">
            {["All", "Shopping", "Places", "More"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  tab === "All" ? "bg-google-blue text-white" : "bg-google-card text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="p-4">
        <h2 className="text-white font-medium text-lg mb-3">Visual matches</h2>
        <div className="grid grid-cols-2 gap-3">
          {searchResults.similarImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Similar image ${index}`}
              className="w-full h-36 object-cover rounded-lg"
            />
          ))}
        </div>
      </section>

      <section className="p-4">
        <h2 className="text-white font-medium text-lg mb-3">Web results</h2>
        <div className="space-y-4">
          {searchResults.imageResults.map((result) => (
            <div key={result.id} className="google-card">
              <img
                src={result.imageUrl}
                alt={result.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-3">
                <h3 className="font-medium text-white">{result.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{result.description}</p>
                <p className="text-xs text-google-blue mt-2">{result.source}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-4">
        <h2 className="text-white font-medium text-lg mb-3">People also search for</h2>
        <div className="flex flex-wrap gap-2">
          {searchResults.relatedSearches.map((term, index) => (
            <button
              key={index}
              className="bg-google-card px-4 py-2 rounded-full text-sm text-gray-300"
            >
              {term}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LensResultsView;
