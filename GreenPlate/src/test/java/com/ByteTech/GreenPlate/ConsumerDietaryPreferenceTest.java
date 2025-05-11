package com.ByteTech.GreenPlate;

import com.ByteTech.GreenPlate.Repository.ConsumerRepository;
import com.ByteTech.GreenPlate.Repository.DietaryPreferenceRepository;
import com.ByteTech.GreenPlate.model.Consumer;
import com.ByteTech.GreenPlate.model.DietaryPreference;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
public class ConsumerDietaryPreferenceTest {

    @Autowired
    private ConsumerRepository consumerRepository;

    @Autowired
    private DietaryPreferenceRepository dietaryPreferenceRepository;

    @Test
    public void testConsumerWithDietaryPreference() {
        // Create Consumer
        Consumer consumer = new Consumer();
        consumer.setName("Test User");
        consumer.setEmail("test@example.com");
        consumer.setPassword("hashedPassword"); // Assume it's already encoded

        // Create DietaryPreference
        DietaryPreference preference = new DietaryPreference();
        preference.setVegan(true);
        preference.setLactoseFree(true);
        preference.setOther("No red meat");

        // Set bidirectional relationship
        preference.setConsumer(consumer);
        consumer.setDietaryPreference(preference);

        // Save only the consumer (thanks to cascade = ALL)
        consumerRepository.save(consumer);

        // Fetch from DB to verify
        Consumer savedConsumer = consumerRepository.findAll().get(0);
        Assertions.assertNotNull(savedConsumer.getDietaryPreference());
        Assertions.assertTrue(savedConsumer.getDietaryPreference().isVegan());
        Assertions.assertEquals("No red meat", savedConsumer.getDietaryPreference().getOther());
    }
}

