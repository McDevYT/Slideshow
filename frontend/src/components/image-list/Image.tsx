function Image(props: { src: string }) {
  return (
    <div className="imageElement">
      <img className="image" src={props.src} />
      <div className="controls">
        <button className="controlButton" />
        <button className="controlButton" />
        <button className="controlButton" />
        <button className="controlButton" />
      </div>
    </div>
  );
}

export default Image;
