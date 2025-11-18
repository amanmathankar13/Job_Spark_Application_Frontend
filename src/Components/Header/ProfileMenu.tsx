import { Menu, Avatar, Switch } from '@mantine/core';
import {
  IconMessageCircle,
  IconUserCircle,
  IconFileCv,
  IconMoon,
  IconMoonStars,
  IconSun,
  IconLogout,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../Slices/UserSlice';
import { removeJwt } from '../../Slices/JwtSlice';


const ProfileMenu=()=> {
const profile = useSelector((state:any)=>state.profile);
const [checked, setChecked] = useState(false);
const user =  useSelector((state:any)=>state.user);
const [opened, setOpened] = useState(false);
const dispatch = useDispatch();
const handleLogout=()=>{
  dispatch(removeUser());
  dispatch(removeJwt());
}
  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex items-center gap-3 cursor-pointer">
            <div className='xs-mx:hidden'>{user.name}</div>
            <Avatar src={profile.picture?`data:image/jpeg;base64,${profile.picture}`:"/avatar.png"} alt="it's me" />
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={()=>setOpened(true)}>
        <Link to={"/profile"}>
            <Menu.Item leftSection={<IconUserCircle size={16} />}>
            Profile
            </Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconMessageCircle size={16} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconFileCv size={16} />}>
          Resume
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={16} />}
          rightSection={
            <Switch
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            size="md"
            color="dark.4"
            onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
            offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />


        <Menu.Item
        onClick={handleLogout}
          color="red"
          leftSection={<IconLogout size={16} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
export default ProfileMenu;