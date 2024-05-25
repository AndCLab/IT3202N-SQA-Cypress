import Navbar from "../components/Navbar";
import { useUserContext } from "../UserContext";

function ProfilePage() {
  const { username } = useUserContext();
  const random = Math.floor(Math.random() * 3) + 1;

  return (
    <>
      <Navbar />

      <main className="bg-base-300 max-w-lg mx-auto shadow-lg rounded-lg mt-16">
        <div className="flex flex-col items-center py-8 gap-8">
          <div className="avatar online">
            <div className="w-40 rounded-full">
              <img src={`/images/${random}.jpg`} />
            </div>
          </div>

          <h1 className="text-2xl">{username}</h1>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
