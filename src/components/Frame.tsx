"use client";

import { useCallback, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { useFrameSDK } from "~/hooks/useFrameSDK";
import { FARCASTER_COLORS } from "~/lib/constants";

function LoginCard({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card className="w-full">
      <CardHeader className="text-white rounded-t-lg" style={{ background: FARCASTER_COLORS.primary }}>
        <CardTitle className="text-center text-xl font-bold">Warpcast Login</CardTitle>
        <CardDescription className="text-white/80 text-center">
          Sign in to continue to Farcaster
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full hover:opacity-90 transition-opacity"
          style={{ background: FARCASTER_COLORS.primary }}
          onClick={onLogin}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}

function FishAnimation() {
  return (
    <div 
      className="relative w-full h-[300px] rounded-lg overflow-hidden"
      style={{ 
        background: `linear-gradient(to bottom, ${FARCASTER_COLORS.water.light}, ${FARCASTER_COLORS.water.dark})` 
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-white text-2xl font-bold z-10 drop-shadow-md">Welcome to Farcaster!</h2>
        <p className="text-white/80 text-sm mt-2 z-10">Swim with the community</p>
      </div>
      
      {/* Farcaster logo in the background */}
      <div className="absolute opacity-10 w-full h-full flex items-center justify-center">
        <div className="text-white text-[150px]">⌐◨-◨</div>
      </div>
      
      {/* Bubbles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div 
          key={`bubble-${i}`}
          className="absolute rounded-full bg-white/30"
          style={{
            width: `${5 + Math.random() * 15}px`,
            height: `${5 + Math.random() * 15}px`,
            left: `${Math.random() * 100}%`,
            bottom: '-20px',
            animation: `rise ${3 + Math.random() * 7}s linear ${Math.random() * 5}s infinite`,
          }}
        />
      ))}
      
      {/* Fish */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = 0.7 + Math.random() * 0.6;
        const isRightToLeft = Math.random() > 0.5;
        
        return (
          <div 
            key={`fish-${i}`}
            className="absolute"
            style={{
              left: isRightToLeft ? '100%' : '-50px',
              top: `${Math.random() * 100}%`,
              transform: `scale(${size}) ${isRightToLeft ? 'scaleX(-1)' : ''}`,
              animation: `${isRightToLeft ? 'swimRightToLeft' : 'swimLeftToRight'} ${10 + Math.random() * 15}s linear ${Math.random() * 10}s infinite`,
              zIndex: Math.floor(size * 10),
            }}
          >
            {['🐟', '🐠', '🐡', '🦈', '🐬', '🐙', '🦑'][Math.floor(Math.random() * 7)]}
          </div>
        );
      })}
      
      <style jsx>{`
        @keyframes rise {
          0% { transform: translateY(0); opacity: 0.7; }
          100% { transform: translateY(-300px); opacity: 0; }
        }
        
        @keyframes swimLeftToRight {
          0% { transform: translateX(0) scale(${0.7 + Math.random() * 0.6}); }
          100% { transform: translateX(calc(100vw + 100px)) scale(${0.7 + Math.random() * 0.6}); }
        }
        
        @keyframes swimRightToLeft {
          0% { transform: translateX(0) scale(${0.7 + Math.random() * 0.6}) scaleX(-1); }
          100% { transform: translateX(calc(-100vw - 100px)) scale(${0.7 + Math.random() * 0.6}) scaleX(-1); }
        }
      `}</style>
    </div>
  );
}

export default function Frame() {
  const { isSDKLoaded } = useFrameSDK();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[300px] mx-auto py-2 px-2">
      {isLoggedIn ? (
        <div className="space-y-4">
          <FishAnimation />
          <Button 
            className="w-full mt-4"
            variant="outline"
            onClick={() => setIsLoggedIn(false)}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <LoginCard onLogin={handleLogin} />
      )}
    </div>
  );
}
