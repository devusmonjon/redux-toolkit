import { withLayout } from "../../components/shared/layout/layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { IUser } from "../../interfaces";
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
import { useRef, useState } from "react";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} from "../../store/api/user-slice";
import axios from "axios";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "sonner";

const home = () => {
  const { data: users, isLoading } = useGetUsersQuery({});

  const [job, setJob] = useState<string | "other">();
  const [gender, setGender] = useState<"Male" | "Female" | "other">();
  const [image, setImage] = useState<File>();
  const closeDialog = useRef<HTMLButtonElement>(null);

  const [editUser, { isLoading: isLoadingUpdate }] = useEditUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();

  return (
    <section id="home">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 py-4 gap-4">
          {users?.map((user: IUser) => (
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
                  <h1 className="pb-[10px]">Bio: {user.bio}</h1>
                  <div className="w-full flex items-center gap-5">
                    <Button
                      variant={"destructive"}
                      className="w-full"
                      onClick={() => {
                        const toastId = toast.loading("Adding user...", {
                          position: "top-center",
                        });
                        deleteUser(user.id as number)
                          .unwrap()
                          .then(() => {
                            toast.success("User deleted successfully", {
                              id: toastId,
                            });
                          });
                      }}
                      disabled={isLoadingDelete}
                    >
                      Delete
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full"
                          disabled={isLoadingUpdate}
                        >
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogTitle>Edit Profile</DialogTitle>
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const toastId = toast.loading("Updating user...", {
                              position: "top-center",
                            });
                            const formData = new FormData(
                              e.target as HTMLFormElement
                            );
                            const data = Object.fromEntries(formData.entries());
                            const imageFormData = new FormData();
                            imageFormData.append("photo", image!);
                            axios
                              .post("https://deepwork.uz/", imageFormData)
                              .then((res) => {
                                const newData = {
                                  ...data,
                                  image: res.data.url,
                                };
                                console.log(newData);
                                // @ts-ignore
                                editUser({
                                  id: user.id,
                                  body: newData as IUser,
                                })
                                  .unwrap()
                                  .then(() => {
                                    toast.success("User updated successfully", {
                                      position: "top-center",
                                      id: toastId,
                                    });
                                  });
                                closeDialog.current?.click();
                              });
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
                                defaultValue={user.first_name}
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="last_name">Last Name</Label>
                              <Input
                                required
                                id="last_name"
                                name="last_name"
                                placeholder="Enter your surname"
                                defaultValue={user.last_name}
                              />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              {image && (
                                <img
                                  src={URL.createObjectURL(image)}
                                  className="w-full object-cover h-[200px] rounded-lg my-5"
                                  alt="alt"
                                />
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
                                  defaultValue={user.job}
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
                                  defaultValue={user.job}
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
                                  defaultValue={user.gender}
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
                                  defaultValue={user.gender}
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
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor="bio">Bio</Label>
                              <Textarea
                                required
                                id="bio"
                                name="bio"
                                placeholder="Enter bio"
                                defaultValue={user.bio}
                              />
                            </div>
                          </div>

                          <DialogFooter className="py-4">
                            <Button
                              type="submit"
                              className="w-full"
                              disabled={isLoadingUpdate}
                            >
                              Save changes
                            </Button>
                            <DialogClose
                              className="w-full"
                              ref={closeDialog}
                            ></DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
          {users?.length === 0 && <p>No users</p>}
          {isLoading && <p>Loading</p>}
        </div>
      </div>
    </section>
  );
};

export default withLayout(home);
