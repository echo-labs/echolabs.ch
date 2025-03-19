import { HStack, VStack } from '../components/tools';
import Image from "next/image";
import Link from 'next/link';

function Item(props: {
  title: string;
  body: string;
  image: string;
  url: string;
}) {
  return (
    <Link
      href={props.url}
    >
      <HStack className="w-xs p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900">
        <Image
          src={props.image}
          alt={props.title}
          width={80}
          height={80}
          className="rounded-xl clip w-20 h-20 bg-white dark:bg-gray-800"
        />
        <VStack className="px-2 w-full justify-start">
          <div className="text-lg font-bold">{props.title}</div>
          <p className="text-xs">{props.body}</p>
        </VStack>
      </HStack>
    </Link>
  );
}
export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter flex flex-row">
        Echo Labs AG
      </h1>
      <p className="mb-4">
        Echo Labs was founded in 2019 to offer various development services and
        products in software. It is fully owned and operated by{" "}
        <Link className="font-medium underline" href="https://www.nide.ch">
          Nicolas Degen
        </Link>
        .
      </p>

      <h2 className="mb-8 text-2xl font-semibold tracking-tighter">Products</h2>
      <div>
        <Item
          title="Echo Photos"
          body="A photo sharing platform for groups."
          image="/images/EchoPhotos.png"
          url="https://www.echophotos.io"
        />

        <Item
          title="Telop"
          body="Remote photo request with verified time and location."
          image="/images/Telop.png"
          url="https://www.telop.org"
        />

        <Item
          title="Morse Relay"
          body="Encode and decode morse code using the camera and the flashlight of your iPhone."
          image="/images/MorseRelay.png"
          url="https://apps.apple.com/app/id1409525264"
        />

        <Item
          title="Alert Clock"
          body="A simple status bar app for macOS that gives you a quick timer and alarm."
          image="/images/AlertClock.png"
          url="https://apps.apple.com/app/id1400127593"
        />

        <Item
          title="Itinerary"
          body="Easily track your upcoming event locations on a map."
          image="/images/Itinerary.png"
          url="https://apps.apple.com/app/id1409525264"
        />

        <Item
          title="Wichtle"
          body="The simplest and best secret santa generator for anyone!"
          image="/images/Wichtle.png"
          url="/wichtle"
        />
      </div>
    </section>
  );
}
