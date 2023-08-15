"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/Button";
import { LuLoader2 } from "react-icons/lu";
import { SiBuymeacoffee } from "react-icons/si";

const DonationForm = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleBuyMeACoffee = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.open("https://buymeacoffee.com/elvismutinda", "_blank");
      setIsLoading(false);
    }, 100);
  };

  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Donation Details</CardTitle>
          <CardDescription>
            I'm working on integrating the app with{" "}
            <a className="underline" href="https://stripe.com/" target="_blank">
              <strong>Stripe</strong>
            </a>{" "}
            for donations but you can{" "}
            <a
              className="underline"
              href="https://buymeacoffee.com/elvismutinda"
              target="_blank"
            >
              <strong>Buy me a Coffee</strong>
            </a>{" "}
            for now
          </CardDescription>
        </CardHeader>
        <CardContent>Kindly click on the button below:</CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <Button
            type="button"
            className={cn(buttonVariants())}
            disabled={isLoading}
            onClick={handleBuyMeACoffee}
          >
            {isLoading && <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />}
            <SiBuymeacoffee className="mr-2" />
            Buy me a Coffee
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default DonationForm;
