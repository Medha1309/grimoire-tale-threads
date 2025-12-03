import { useNavigate } from 'react-router-dom';
import { buildRoute, ROUTES } from '../config/routes';

/**
 * Custom navigation hook that provides type-safe navigation
 */
export const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = {
    home: () => navigate(ROUTES.HOME),
    stories: () => navigate(ROUTES.STORIES),
    storyDetail: (slug: string) => navigate(buildRoute.storyDetail(slug)),
    reader: (slug: string) => navigate(buildRoute.reader(slug)),
    about: () => navigate(ROUTES.ABOUT),
    contact: () => navigate(ROUTES.CONTACT),
    compose: () => navigate(ROUTES.COMPOSE),
    login: () => navigate(ROUTES.LOGIN),
    signup: () => navigate(ROUTES.SIGNUP),
    profile: () => navigate(ROUTES.PROFILE),
    forum: () => navigate(ROUTES.FORUM),
    forumPost: (postId: string) => navigate(buildRoute.forumPost(postId)),
    diary: () => navigate(ROUTES.DIARY),
    diaryEntry: (entryId: string) => navigate(buildRoute.diaryEntry(entryId)),
  };

  return { goTo, navigate };
};
