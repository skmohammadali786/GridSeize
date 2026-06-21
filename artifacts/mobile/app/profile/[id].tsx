import { Redirect, useLocalSearchParams } from 'expo-router';
export default function ProfileById() {
  const { id } = useLocalSearchParams();
  return <Redirect href={`/community/user/${id}` as any} />;
}
