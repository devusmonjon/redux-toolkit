import { useNavigate } from "react-router-dom";
import { withLayout } from "../../components/shared/layout/layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../interfaces";
import { deleteUser, updateUser } from "../../store/user-slice/users";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useState } from "react";
import { imageToBase64 } from "../../helpers/image-codec";

const home = () => {
  const users = useSelector(
    (state: { users: { value: IUser[] } }) => state.users.value
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [job, setJob] = useState<string | "other">();
  const [gender, setGender] = useState<"Male" | "Female" | "other">();
  const [image, setImage] = useState<File>();

  return (
    <section id="home">
      <div className="container">
        <div className="grid grid-cols-4 py-4 gap-4">
          {users.map((user: IUser) => (
            <Card className="flex flex-col space-y-3 relative" key={user.id}>
              <CardContent className="w-full">
                <img
                  src={user.image}
                  className="w-full object-cover h-[200px] rounded-lg my-5"
                  alt="alt"
                />
                <CardTitle>
                  {user.first_name} {user.last_name}
                </CardTitle>
              </CardContent>
              <CardFooter className="">
                <div className="space-y-2 w-full">
                  <h1>Job: {user.job}</h1>
                  <h1>Gender: {user.gender}</h1>
                  <div className="w-full flex items-center gap-5">
                    <Button
                      variant={"destructive"}
                      className="w-full"
                      onClick={() => dispatch(deleteUser(user as IUser))}
                    >
                      Delete
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogTitle>Edit Profile</DialogTitle>
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(
                              e.target as HTMLFormElement
                            );
                            const data = Object.fromEntries(formData.entries());
                            const newData = {
                              id: user.id,
                              ...data,
                              image: await imageToBase64(image!),
                            };
                            console.log(newData);
                            // @ts-ignore
                            dispatch(updateUser(newData as IUser));
                            navigate("/");
                          }}
                        >
                          <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="first_name">First Name</Label>
                              <Input
                                required
                                id="first_name"
                                name="first_name"
                                placeholder="Enter your name"
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="last_name">Last Name</Label>
                              <Input
                                required
                                id="last_name"
                                name="last_name"
                                placeholder="Enter your surname"
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="age">Age</Label>
                              <Input
                                required
                                id="age"
                                name="age"
                                placeholder="Enter your age"
                                type="number"
                                min={0}
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              {image ? (
                                <img
                                  src={URL.createObjectURL(image)}
                                  className="w-full object-cover h-[200px] rounded-lg my-5"
                                  alt="alt"
                                />
                              ) : (
                                <Label
                                  htmlFor="photo"
                                  className="w-full h-[200px] rounded-lg my-5 bg-slate-900"
                                ></Label>
                              )}
                              <Label htmlFor="photo">Photo</Label>
                              <Input
                                required
                                id="photo"
                                name="photo"
                                placeholder="Upload your photo"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files) {
                                    setImage(e.target.files[0]);
                                  }
                                }}
                              />
                            </div>

                            {job === "other" ? (
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="job">Job field</Label>
                                <Input
                                  required
                                  id="job"
                                  name="job"
                                  placeholder="Enter custom job"
                                  type="input"
                                />
                                <Button
                                  variant="link"
                                  onClick={() => setJob("")}
                                >
                                  Change
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="job">Job</Label>
                                <Select
                                  required
                                  name="job"
                                  onValueChange={(value) => {
                                    setJob(value as string | "other");
                                  }}
                                >
                                  <SelectTrigger id="job">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent position="popper">
                                    <SelectItem value="Softwere Developer">
                                      Softwere Developer
                                    </SelectItem>
                                    <SelectItem value="Front End Developer">
                                      Front End Developer
                                    </SelectItem>
                                    <SelectItem value="Back End Developer">
                                      Back End Developer
                                    </SelectItem>
                                    <SelectItem value="Full Stack Developer">
                                      Full Stack Developer
                                    </SelectItem>
                                    <SelectItem value="Mobile Developer">
                                      Mobile Developer
                                    </SelectItem>
                                    <SelectItem value="Designer">
                                      Designer
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}

                            {gender === "other" ? (
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="gender">Gender field</Label>
                                <Input
                                  required
                                  id="gender"
                                  name="gender"
                                  placeholder="Enter custom gender"
                                  type="input"
                                  value={user.gender}
                                />
                                <Button
                                  variant="link"
                                  onClick={() => setGender("Male")}
                                >
                                  Change
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                  required
                                  name="gender"
                                  onValueChange={(value) => {
                                    setGender(
                                      value as "Male" | "Female" | "other"
                                    );
                                  }}
                                >
                                  <SelectTrigger id="gender">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent position="popper">
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">
                                      Female
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                          <DialogFooter className="py-4">
                            <DialogClose className="w-full">
                              <Button type="submit" className="w-full">
                                Save changes
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Button className="w-full" onClick={() => navigate("/create")}>
          Create user
        </Button>
      </div>
    </section>
  );
};

export default withLayout(home);
