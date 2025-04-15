//src/components/NewsFeed.tsx

const NewsFeed = () => {
  return (
    <div className="news-card mt-4 overflow-hidden">
      <img
        src="/ratan-tata.jpg"
        alt="News image"
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-2">
        <h3 className="text-lg font-semibold mt-2">
          This superstar was Ratan Tata's closest friend, shared same room, went
          for picnics, listened songs toge...
        </h3>
      </div>
    </div>
  );
};

export default NewsFeed;
