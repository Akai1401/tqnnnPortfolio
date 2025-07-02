import { customLocalStorage } from '@/utils/localStorage';
import { usePathname } from 'next/navigation';

const useLoginTwitter = () => {
  const pathname = usePathname();
  const onLoginTwitter = async () => {
    const rootUrl = 'https://twitter.com/i/oauth2/authorize';
    const options = {
      redirect_uri: `${process.env.NEXT_PUBLIC_FE_URL}/oauth`,
      // client_id: TWITTER_CLIENT_ID,
      state: 'state',
      response_type: 'code',
      code_challenge: 'challenge',
      code_challenge_method: 'plain',
      scope: [
        'users.read',
        'tweet.read',
        'follows.read',
        'offline.access',
      ].join(' '),
    } as any;
    const qs = new URLSearchParams(options).toString();
    customLocalStorage.saveData('oauth_type', 'twitter');
    customLocalStorage.saveData('oauth_from', pathname);
    return (window.location.href = `${rootUrl}?${qs}`);
  };
  return { onLoginTwitter };
};

export default useLoginTwitter;
