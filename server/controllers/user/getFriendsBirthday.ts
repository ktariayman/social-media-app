import { Request, Response } from 'express';
import { User } from '../../model';

interface IRequest extends Request {
  user?: any;
}

const getFriendBirthdays = async (req: IRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('friends');

    const friendBirthdays = user.friends.map((friend: any) => ({
      name: `${friend.first_name} ${friend.last_name}`,
      username: friend.username,
      picture: friend.picture,
      age: calculateAge(friend.bYear, friend.bMonth, friend.bDay),
      birthday: `${friend.bMonth}/${friend.bDay}/${friend.bYear}`,
      birthDate: new Date(
        `${friend.bMonth}/${friend.bDay}/${new Date().getFullYear()}`
      ),
    }));

    const currentDate = new Date();
    const nextSevenDays = new Date(currentDate);
    nextSevenDays.setDate(currentDate.getDate() + 7);

    const todayBirthday = friendBirthdays.filter(
      (friend: any) =>
        friend.birthDate.getMonth() === currentDate.getMonth() &&
        friend.birthDate.getDate() === currentDate.getDate()
    );

    const recentBirthday = friendBirthdays.filter(
      (friend: any) => friend.birthDate < currentDate && !(friend.birthDate.getMonth() === currentDate.getMonth() &&
        friend.birthDate.getDate() === currentDate.getDate())
    );

    const comingBirthday = friendBirthdays.filter(
      (friend: any) =>
        friend.birthDate > currentDate && friend.birthDate <= nextSevenDays
    );

    todayBirthday.sort((a: any, b: any) => a.birthDate - b.birthDate);
    recentBirthday.sort((a: any, b: any) => a.birthDate - b.birthDate);
    comingBirthday.sort((a: any, b: any) => a.birthDate - b.birthDate);

    res.json({
      todayBirthday,
      recentBirthday,
      comingBirthday,
    });
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

function calculateAge(bYear: number, bMonth: number, bDay: number): number {
  const today = new Date();
  const birthDate = new Date(bYear, bMonth - 1, bDay);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export default getFriendBirthdays;
