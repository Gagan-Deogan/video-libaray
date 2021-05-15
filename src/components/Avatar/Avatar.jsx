export const Avatar = ({ image, name }) => {
  return (
    <div className="avatar-circle">
      <img src={"https://api-ecommerce-image.netlify.app" + image} alt={name} />
    </div>
  );
};
