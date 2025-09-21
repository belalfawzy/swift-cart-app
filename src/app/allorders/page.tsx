"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { OrderData, OrderStatus } from "@/types/order.type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { showErrorToast } from "@/utils/toast";
import getUserOrdersAction from "@/OrderActions/getUserOrders.action";

export default function AllOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to get order status
  const getOrderStatus = (order: OrderData): OrderStatus => {
    if (order.isDelivered) {
      return {
        isPaid: order.isPaid,
        isDelivered: order.isDelivered,
        status: 'delivered',
        statusText: 'Delivered',
        statusColor: 'bg-green-100 text-green-800'
      };
    } else if (order.isPaid) {
      return {
        isPaid: order.isPaid,
        isDelivered: order.isDelivered,
        status: 'paid',
        statusText: 'Paid - Processing',
        statusColor: 'bg-blue-100 text-blue-800'
      };
    } else {
      return {
        isPaid: order.isPaid,
        isDelivered: order.isDelivered,
        status: 'pending',
        statusText: 'Pending Payment',
        statusColor: 'bg-yellow-100 text-yellow-800'
      };
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP'
    }).format(amount);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("Session status:", status);
      console.log("Session data:", session);
      
      if (status === "loading") return;
      
      if (!session?.user?.id) {
        console.log("No user ID found in session");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log("Fetching orders for user ID:", session.user.id);
        const response = await getUserOrdersAction(session.user.id);
        console.log("Orders response:", response);
        
        if (response && response.data && Array.isArray(response.data)) {
          setOrders(response.data);
          console.log("Orders set:", response.data);
          console.log("Number of orders:", response.data.length);
        } else {
          console.log("No orders data in response or data is not an array");
          console.log("Response structure:", response);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        showErrorToast(`Failed to load orders: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [session, status]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Orders...</h2>
            <p className="text-gray-600">Please wait while we fetch your orders.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-lock text-6xl text-gray-300"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You need to be signed in to view your orders.
            </p>
            <a
              href="/login"
              className="inline-flex items-center px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-shopping-bag text-6xl text-gray-300"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">No Orders Yet</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven&apos;t placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  console.log("Rendering orders:", orders);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">
            {orders.length} {orders.length === 1 ? "order" : "orders"} found
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => {
            const orderStatus = getOrderStatus(order);
            return (
              <Card key={order._id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-1">
                        Placed on {formatDate(order.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className={`${orderStatus.statusColor} font-semibold px-3 py-1`}>
                        {orderStatus.statusText}
                      </Badge>
                      <p className="text-2xl font-bold text-teal-600 mt-2">
                        {formatCurrency(order.totalOrderPrice)}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Shipping Address */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <i className="fa-solid fa-map-marker-alt text-teal-500 mr-2"></i>
                      Shipping Address
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 font-medium">{order.shippingAddress.details}</p>
                      <p className="text-gray-600">{order.shippingAddress.city}</p>
                      <p className="text-gray-600">{order.shippingAddress.phone}</p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <i className="fa-solid fa-credit-card text-teal-500 mr-2"></i>
                      Payment Method
                    </h3>
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-gray-700">
                        {order.paymentMethodType === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                      </Badge>
                      {order.isPaid && (
                        <span className="ml-3 text-green-600 font-medium flex items-center">
                          <i className="fa-solid fa-check-circle mr-1"></i>
                          Paid
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <i className="fa-solid fa-box text-teal-500 mr-2"></i>
                      Order Items ({order.cartItems.length})
                    </h3>
                    <div className="space-y-3">
                      {order.cartItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 bg-white rounded-lg p-4 border border-gray-200">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 line-clamp-1">
                              {item.product.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item.product.category.name} • {item.product.brand.name}
                            </p>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-yellow-600 mr-2">
                                <i className="fa-solid fa-star"></i> {item.product.ratingsAverage}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">
                              {formatCurrency(item.price)}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.count}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}