package com.animalwelfare.service;

import com.animalwelfare.entity.Animal;
import com.animalwelfare.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public Optional<Animal> getAnimalById(Long id) {
        return animalRepository.findById(id);
    }

    public Animal saveAnimal(Animal animal) {
        if (animal.getReportedAt() == null) {
            animal.setReportedAt(LocalDateTime.now());
        }
        if (animal.getStatus() == null || animal.getStatus().isEmpty()) {
            animal.setStatus("reported");
        }
        return animalRepository.save(animal);
    }

    public Animal feedAnimal(Long id, boolean fedToday, LocalDateTime lastFed) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal not found with id: " + id));
        
        animal.setFedToday(fedToday);
        animal.setLastFed(lastFed);
        return animalRepository.save(animal);
    }

    public Animal adoptAnimal(Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal not found with id: " + id));
        
        // Change status to "pending" when adoption is initiated
        animal.setStatus("pending");
        return animalRepository.save(animal);
    }

    public Animal updateAnimalStatus(Long id, String status) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal not found with id: " + id));
        
        animal.setStatus(status);
        return animalRepository.save(animal);
    }

    public List<Animal> getAnimalsByStatus(String status) {
        return animalRepository.findByStatus(status);
    }

    public List<Animal> getAnimalsByFeedingStatus(boolean fedToday) {
        return animalRepository.findByFedToday(fedToday);
    }

    public List<Animal> searchAnimalsByLocation(String location) {
        return animalRepository.findByLocationContaining(location);
    }

    public List<Animal> searchAnimalsByNameOrBreed(String searchTerm) {
        return animalRepository.findByNameOrBreedContaining(searchTerm, searchTerm);
    }

    public void deleteAnimal(Long id) {
        if (!animalRepository.existsById(id)) {
            throw new RuntimeException("Animal not found with id: " + id);
        }
        animalRepository.deleteById(id);
    }
}