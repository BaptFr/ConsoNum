<?php

namespace App\Service;

use Stripe\StripeClient;

class PaymentService
{
    private StripeClient $stripe;

    public function __construct(string $stripeSecretKey)
    {
        $this->stripe = new StripeClient($stripeSecretKey);
    }

    public function createPaymentIntent(int $amount, string $currency = 'eur'): \Stripe\PaymentIntent
    {
        return $this->stripe->paymentIntents->create([
            'amount' => $amount,
            'currency' => $currency,
            'automatic_payment_methods' => ['enabled' => true],
            'metadata' => ['user_id' => $userId],
        ]);
    }

    public function constructEvent(string $payload, string $sigHeader, string $webhookSecret): \Stripe\Event
    {
        return \Stripe\Webhook::constructEvent($payload, $sigHeader, $webhookSecret);
    }
}
