"use client";

import { useEffect, useCallback, useState } from "react";
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

function LoginCard({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card className="w-full">
      <CardHeader className="bg-purple-600 text-white rounded-t-lg">
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
          className="w-full bg-purple-600 hover:bg-purple-700"
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
    <div className="relative w-full h-[300px] bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-2xl font-bold z-10">Welcome to Farcaster!</h2>
      </div>
      {Array.from({ length: 15 }).map((_, i) => (
        <div 
          key={i}
          className="absolute text-4xl animate-swim"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {['🐟', '🐠', '🐡', '🦈', '🐬', '🐙', '🦑'][Math.floor(Math.random() * 7)]}
        </div>
      ))}
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
        <FishAnimation />
      ) : (
        <LoginCard onLogin={handleLogin} />
      )}
    </div>
  );
}
