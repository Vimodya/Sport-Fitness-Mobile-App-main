import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { ClickCountContext } from "./ClickCountContext";

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  rating: {
    rate: number; //Vimm56#$
    count: number;
  };
};

export default function Home() {
  const { clickCount, setClickCount, yourName } = useContext(ClickCountContext);
  console.log(yourName);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=England"
        );
        const data = await response.json();

        // Transform the API response to fit the Product type
        const transformedProducts = data.countries
          .slice(0, 10)
          .map((item: any) => ({
            id: parseInt(item.idLeague), // Convert idLeague to number
            title: item.strLeague, // Use strLeague as title
            description: item.strSport, // Use strSport as description
            image: "https://via.placeholder.com/150", // Placeholder image
            category: "Sports", // Static category
            price: 0, // Static price
            rating: {
              rate: 4.5, // Static rating
              count: 300, // Static count
            },
          }));

        setProducts(transformedProducts); // Set transformed data
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    fetchProducts();
  }, []);

  const handleItemClick = () => {
    setClickCount(clickCount + 1);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Welcome, {yourName}</Text>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={handleItemClick}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <Text style={styles.statusTag}>
                {item.rating.count > 200 ? "Available" : "Out of Stock"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    height: 60,
    backgroundColor: "#9B0C3C",
    justifyContent: "center",
    alignItems: "center",
  },
  topBarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    margin: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  cardImage: {
    height: 150,
    width: "100%",
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  statusTag: {
    fontSize: 12,
    fontWeight: "bold",
    color: "green",
    marginTop: 5,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#9B0C3C",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
  },
});
