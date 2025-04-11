import video from "../assets/video.mp4";

export default function RecipeStory() {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Slice Stories</h2>
      <div className="row">
        <div className="col-md-4 mb-4">
          <video src={video} controls width="100%" />
          <h5 className="mt-2">Wheat Bread Recipe</h5>
        </div>

        <div className="col-md-4 mb-4">
          <video src={video} controls width="100%" />
          <h5 className="mt-2">Multigrain Bread Recipe</h5>
        </div>

        <div className="col-md-4 mb-4">
          <video src={video} controls width="100%" />
          <h5 className="mt-2">Ragi Bread Recipe</h5>
        </div>
      </div>
    </section>
  );
}
