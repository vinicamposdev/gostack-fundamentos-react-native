import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const getProductMemo = useMemo(() => {
    const getAllProducts = products.reduce(
      (t, p) => t + p.quantity * p.price,
      0,
    );
    return formatValue(getAllProducts);
  }, [products]);

  const getAllCartItens = useMemo(() => {
    const getProductsQuantity = products.reduce((t, p) => t + p.quantity, 0);
    return getProductsQuantity;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${getAllCartItens} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{getProductMemo}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
