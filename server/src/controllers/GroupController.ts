
import { Group } from "../entities/Group";
import { Permission } from "../entities/Permission";
import { User } from '../entities/User';

async function creatGroup(perms: any) {


  const perm = new Permission();
  perm.codename = "contact-student";
  perm.name = "Permission to comunicate with students";
  await Permission.save(perm);

  const perm1 = new Permission();
  perm.codename = "post-permission";
  perm.name = "Permission to make a post";
  await Permission.save(perm1);

//   const perm2 = new Permission();
//   perm.codename = "interact-resources";
//   perm.name = "Permission to interact with resources";
//   await Permission.save(perm2);

//   const perm3 = new Permission();
//   perm.codename = "update-me";
//   perm.name = "Permission to own details";
//   await Permission.save(perm3);

  const group = new Group();
  group.codename = "Mentors";
  group.name = "All_Mentor";
  group.permissions = [perms, perm1];
  await Group.save(group);

}

export const addUserToAGroup = async (
  id: string,
  userId: string
): Promise<string> => {
  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) {
    return 'User not found.';
  }

  const group = await Group.findOne({
    where: { id },
  });

  if (!group) {
    return 'Group not found.';
  }

  user.groups.push(group);

  return `${user?.username} has been added to the ${group.codename} group.`;
};
export default creatGroup;