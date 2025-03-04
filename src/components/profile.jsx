import Avatar from "./avatar";
import Header from "./header";
import ProductCard from "./products/product-card";

const Profile = ({ user, role, products }) => {
  const lastSeen = JSON.parse(localStorage.getItem("lastSeen"));

  console.log(products)
  if (!user) return;

  return (
    <div>
      <Avatar lg name={user?.name} />
      <p className="uppercase font-mono text-sm font-medium text-center pt-2">{role}</p>

      <h2 className='text-2xl'>Welcome back, {user?.name}</h2>
      <p className='text-gray-400'>{user.email}</p>
      <p>Products: {products.length}</p>
      <div className='mt-4 space-y-2'>
        <Header title={"Last Seen"} />
        <div className='grid grid-cols-1 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {lastSeen && <ProductCard product={lastSeen} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
