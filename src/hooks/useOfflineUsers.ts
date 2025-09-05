import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const API_URL = "https://jsonplaceholder.typicode.com/users";

export function useOfflineUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Network error");
        const data: User[] = await res.json();
        setUsers(data);
        await AsyncStorage.setItem("users", JSON.stringify(data));
      } catch (err) {
        console.log("Fetching failed, loading cache...");
        const cached = await AsyncStorage.getItem("users");
        if (cached) {
          setUsers(JSON.parse(cached));
        } else {
          setError("No data available offline");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { users, loading, error };
}
