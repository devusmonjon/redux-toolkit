import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { withLayout } from "../../components/shared/layout/layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/user-slice/users";
import { IUser } from "../../interfaces";
import { imageToBase64 } from "../../helpers/image-codec";
import { useAddUserMutation } from "../../store/api/user-slice";
import axios from "axios";

const Create = (): JSX.Element => {
  const [job, setJob] = useState<string | "other">();
  const [gender, setGender] = useState<"Male" | "Female" | "other">();
  const [image, setImage] = useState<File>();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [addUser, { isLoading }] = useAddUserMutation();

  return (
    <div className="container">
      <div className="mt-10">
        <Card className="mx-auto w-[350px] border-none dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Add User</CardTitle>
            <CardDescription>Add user to your project</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
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
                    addUser(newData as IUser);
                    navigate("/");
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
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      className="w-full object-cover h-[200px] rounded-lg my-5"
                      alt="alt"
                    />
                  ) : (
                    <Label
                      htmlFor="photo"
                      className="w-full h-[200px] rounded-lg my-5 bg-slate-300"
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
                    <Button variant="link" onClick={() => setJob("")}>
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
                        <SelectItem value="Designer">Designer</SelectItem>
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
                    />
                    <Button variant="link" onClick={() => setGender("Male")}>
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
                        setGender(value as "Male" | "Female" | "other");
                      }}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <CardFooter className="flex justify-between w-full p-0 py-4">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button type="submit">Add</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Create;
