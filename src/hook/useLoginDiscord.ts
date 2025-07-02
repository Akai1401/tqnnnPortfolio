import { customLocalStorage } from '@/utils/localStorage';

import { toastError } from '@/utils/toast';
import { usePathname } from 'next/navigation';

const useLoginDiscord = () => {
  const pathname = usePathname();
  const onLoginDiscord = async () => {
    const redirectUrl = `${process.env.NEXT_PUBLIC_FE_URL}/oauth`;
    try {
      customLocalStorage.saveData('oauth_from', pathname);
      customLocalStorage.saveData('oauth_type', 'discord');
      // window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=code&scope=identify%20guilds.members.read%20guilds%20email`;
    } catch (error) {
      toastError(`Error fetching Discord OAuth2 URL: ${error}`);
    }
  };
  return { onLoginDiscord };
};

export default useLoginDiscord;
