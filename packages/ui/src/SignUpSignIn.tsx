import { useState } from 'react'
import { YStack, Paragraph, XStack, Button, Input, Stack } from 'tamagui'
import { Link } from 'solito/link'
import { ActivityIndicator } from 'react-native'
import { type Provider, type AuthError } from '@supabase/supabase-js'
import { Svg, Defs, G, Path, Stop, Circle, LinearGradient } from "react-native-svg";


/* 
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
</svg>

*/

interface Props {
  type: 'sign-up' | 'sign-in'
  handleOAuthWithPress: (provider: Provider) => void
  handleEmailWithPress: (emailAddress, password) => void
}

export const SignUpSignInComponent: React.FC<Props> = ({
  type,
  handleOAuthWithPress,
  handleEmailWithPress,
}) => {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState<'google' | 'apple' | 'instagram' | null>()
  const [googleError, setGoogleError] = useState<AuthError>()

  return (
    <YStack
      borderRadius="$10"
      space
      px="$7"
      py="$6"
      w={350}
      shadowColor={'#00000020'}
      shadowRadius={26}
      shadowOffset={{ width: 0, height: 4 }}
      bg="$background"
    >
      <Paragraph size="$5" fontWeight={'700'} opacity={0.8} mb="$1">
        {type === 'sign-up' ? 'Crea tu cuenta' : 'Ingrese a su cuenta'}
      </Paragraph>
      {/* all the oauth sign up options */}
      <XStack space jc={'space-evenly'} theme="light">
        {/* 2 buttons, for google and apple */}
        <Button
          size="$5"
          onPress={() => handleOAuthWithPress('google')}
          hoverStyle={{ opacity: 0.8 }}
          focusStyle={{ scale: 0.95 }}
          borderColor="$gray8Light"
        >
          {loading !== 'google' ? (<Svg height={24} width={24} viewBox="-0.5 0 48 48" id="Google_Svg">
            <Defs>
            </Defs>
            <G id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <G id="Color-" transform="translate(-401.000000, -860.000000)">
                <G id="Google" transform="translate(401.000000, 860.000000)">
                  <Path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05" />
                  <Path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335" />
                  <Path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853" />
                  <Path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4" />
                </G>
              </G>
            </G>
          </Svg>)
            : (
              <ActivityIndicator
                size={'small'}
                animating
                color={'black'}
              />
            )}
        </Button>
        <Button
          size="$5"
          onPress={() => console.log("Signing with Apple")}
          hoverStyle={{ opacity: 0.8 }}
          focusStyle={{ scale: 0.95 }}
          borderColor="$gray8Light"
        >
          <Svg fill="#000000" height={24} width={24} id="Apple_Svg"
            viewBox="0 0 22.773 22.773">
            <Path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573
			c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"/>
            <Path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334
			c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0
			c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019
			c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464
			c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648
			c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"/>
          </Svg>
        </Button>

        <Button
          size="$5"
          onPress={() => console.log("Signing with Instagram")}
          hoverStyle={{ opacity: 0.8 }}
          focusStyle={{ scale: 0.95 }}
          borderColor="$gray8Light"
        >
          <Svg height={24} width={24} id="Instagram_Svg"
            viewBox="0 0 551.034 551.034">
            <G id="XMLID_13_">

              <LinearGradient id="XMLID_2_" gradientUnits="userSpaceOnUse" x1="275.517" y1="4.5714" x2="275.517" y2="549.7202" gradientTransform="matrix(1 0 0 -1 0 554)">
                <Stop offset="0" stopColor='#E09B3D' />
                <Stop offset="0.3" stopColor='#C74C4D' />
                <Stop offset="0.6" stopColor='#C21975' />
                <Stop offset="1" stopColor='#7024C4' />
              </LinearGradient>
              <Path id="XMLID_17_" fill='url(#XMLID_2_)' d="M386.878,0H164.156C73.64,0,0,73.64,0,164.156v222.722
		c0,90.516,73.64,164.156,164.156,164.156h222.722c90.516,0,164.156-73.64,164.156-164.156V164.156
		C551.033,73.64,477.393,0,386.878,0z M495.6,386.878c0,60.045-48.677,108.722-108.722,108.722H164.156
		c-60.045,0-108.722-48.677-108.722-108.722V164.156c0-60.046,48.677-108.722,108.722-108.722h222.722
		c60.045,0,108.722,48.676,108.722,108.722L495.6,386.878L495.6,386.878z"/>

              <LinearGradient id="XMLID_3_" gradientUnits="userSpaceOnUse" x1="275.517" y1="4.5714" x2="275.517" y2="549.7202" gradientTransform="matrix(1 0 0 -1 0 554)">
                <Stop offset="0" stopColor='#E09B3D' />
                <Stop offset="0.3" stopColor='#C74C4D' />
                <Stop offset="0.6" stopColor='#C21975' />
                <Stop offset="1" stopColor='#7024C4' />
              </LinearGradient>
              <Path id="XMLID_81_" fill='url(#XMLID_3_)' d="M275.517,133C196.933,133,133,196.933,133,275.516
		s63.933,142.517,142.517,142.517S418.034,354.1,418.034,275.516S354.101,133,275.517,133z M275.517,362.6
		c-48.095,0-87.083-38.988-87.083-87.083s38.989-87.083,87.083-87.083c48.095,0,87.083,38.988,87.083,87.083
		C362.6,323.611,323.611,362.6,275.517,362.6z"/>

              <LinearGradient id="XMLID_4_" gradientUnits="userSpaceOnUse" x1="418.306" y1="4.5714" x2="418.306" y2="549.7202" gradientTransform="matrix(1 0 0 -1 0 554)">
                <Stop offset="0" stopColor='#E09B3D' />
                <Stop offset="0.3" stopColor='#C74C4D' />
                <Stop offset="0.6" stopColor='#C21975' />
                <Stop offset="1" stopColor='#7024C4' />
              </LinearGradient>
              <Circle id="XMLID_83_" fill='url(#XMLID_4_)' cx="418.306" cy="134.072" r="34.149" />
            </G>
          </Svg>

        </Button>

      </XStack>
      <XStack ai="center" width="100%" jc="space-between">
        <Stack h="$0.25" bg="black" w="$10" opacity={0.1} />
        <Paragraph size="$3" opacity={0.5}>
          or
        </Paragraph>
        <Stack h="$0.25" bg="black" w="$10" opacity={0.1} />
      </XStack>

      {/* email sign up option */}
      <Input
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={(text) => {
          setEmailAddress(text)
        }}
      />
      <Input
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={(text) => {
          setPassword(text)
        }}
        textContentType="password"
        secureTextEntry
      />

      {/* sign up button */}
      <Button
        themeInverse
        onPress={() => {
          handleEmailWithPress(emailAddress, password)
        }}
        hoverStyle={{ opacity: 0.8 }}
        onHoverIn={() => { }}
        onHoverOut={() => { }}
        focusStyle={{ scale: 0.975 }}
      >
        {type === 'sign-up' ? 'Crear Cuenta' : 'Inicia Sesión'}
      </Button>

      {/* or sign in, in small and less opaque font */}
      <XStack>
        <Paragraph size="$2" mr="$2" opacity={0.4}>
          {type === 'sign-up' ? 'Ya tienes una cuenta?' : 'No tienes una cuenta?'}
        </Paragraph>
        <Link href={type === 'sign-up' ? '/sign-in' : '/sign-up'}>
          <Paragraph
            cursor={'pointer'}
            size="$2"
            fontWeight={'700'}
            opacity={0.5}
            hoverStyle={{ opacity: 0.4 }}
          >
            {type === 'sign-up' ? 'Inicia Sesión' : 'Crear Cuenta'}
          </Paragraph>
        </Link>
      </XStack>

      {/* forgot password */}
      {type === 'sign-in' && (
        <XStack mt="$-2.5">
          <Paragraph size="$2" mr="$2" opacity={0.4}>
            Olvidaste tu constraseña?
          </Paragraph>
          <Link href="/password-reset">
            <Paragraph
              cursor={'pointer'}
              size="$2"
              fontWeight={'700'}
              opacity={0.5}
              hoverStyle={{ opacity: 0.4 }}
            >
              Restablecer
            </Paragraph>
          </Link>
        </XStack>
      )}
    </YStack>
  )
}
