/**
 * 404 Not Found Page
 * Displayed when user navigates to invalid route
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { SmartBackButton, HomeButton, NavigationGroup } from '../components/shared/SmartNavigationButtons';
import { PageContainer, Section, Stack, Center } from '../components/layouts/LayoutComponents';
import { Heading, BodyText } from '../components/shared/Typography';

export const NotFound: React.FC = () => {
  const { goTo, canGoBack } = useAppNavigation();
  
  return (
    <PageContainer size="lg">
      <Section spacing="xl">
        <Center className="min-h-[60vh]">
          <Stack spacing="lg" className="text-center max-w-2xl">
            {/* Spooky 404 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Heading 
                as="h1" 
                className="text-8xl font-display text-zinc-800"
                style={{
                  textShadow: '0 0 40px rgba(139, 0, 0, 0.5)',
                }}
              >
                404
              </Heading>
            </motion.div>
            
            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Heading as="h2" className="text-3xl mb-4 text-zinc-300">
                Page Not Found
              </Heading>
              <BodyText className="text-zinc-500 text-lg">
                The page you're looking for has vanished into the darkness...
                <br />
                Perhaps it never existed at all.
              </BodyText>
            </motion.div>
            
            {/* Navigation Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="pt-8"
            >
              <NavigationGroup position="center">
                {canGoBack && (
                  <SmartBackButton 
                    variant="prominent"
                    label="Go Back"
                  />
                )}
                <HomeButton />
              </NavigationGroup>
              
              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-zinc-800/30">
                <BodyText className="text-zinc-600 mb-4">
                  Or explore these areas:
                </BodyText>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => goTo.stories()}
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    Library
                  </button>
                  <span className="text-zinc-700">•</span>
                  <button
                    onClick={() => goTo.forum()}
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    Tea Room
                  </button>
                  <span className="text-zinc-700">•</span>
                  <button
                    onClick={() => goTo.diary()}
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    Boudoir
                  </button>
                  <span className="text-zinc-700">•</span>
                  <button
                    onClick={() => goTo.about()}
                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    About
                  </button>
                </div>
              </div>
            </motion.div>
          </Stack>
        </Center>
      </Section>
    </PageContainer>
  );
};

export default NotFound;
