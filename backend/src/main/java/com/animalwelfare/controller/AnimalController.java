package com.animalwelfare.controller;

import com.animalwelfare.dto.AdoptRequest;
import com.animalwelfare.dto.FeedRequest;
import com.animalwelfare.entity.Animal;
import com.animalwelfare.service.AnimalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:5500", "http://localhost:5500"})
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @GetMapping("/all")
    public ResponseEntity<List<Animal>> getAllAnimals() {
        try {
            List<Animal> animals = animalService.getAllAnimals();
            return ResponseEntity.ok(animals);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/animals/{id}")
    public ResponseEntity<Animal> getAnimalById(@PathVariable Long id) {
        try {
            return animalService.getAnimalById(id)
                    .map(animal -> ResponseEntity.ok(animal))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/animals/report")
    public ResponseEntity<Animal> reportAnimal(@Valid @RequestBody Animal animal) {
        try {
            Animal savedAnimal = animalService.saveAnimal(animal);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAnimal);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/feed/{id}")
    public ResponseEntity<Animal> feedAnimal(@PathVariable Long id, @Valid @RequestBody FeedRequest feedRequest) {
        try {
            Animal updatedAnimal = animalService.feedAnimal(id, feedRequest.isFedToday(), LocalDateTime.now());
            return ResponseEntity.ok(updatedAnimal);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/adopt/{id}")
    public ResponseEntity<Animal> adoptAnimal(@PathVariable Long id) {
        try {
            Animal updatedAnimal = animalService.adoptAnimal(id);
            return ResponseEntity.ok(updatedAnimal);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/animals/{id}/status")
    public ResponseEntity<Animal> updateAnimalStatus(@PathVariable Long id, @Valid @RequestBody AdoptRequest adoptRequest) {
        try {
            Animal updatedAnimal = animalService.updateAnimalStatus(id, adoptRequest.getStatus());
            return ResponseEntity.ok(updatedAnimal);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/animals/status/{status}")
    public ResponseEntity<List<Animal>> getAnimalsByStatus(@PathVariable String status) {
        try {
            List<Animal> animals = animalService.getAnimalsByStatus(status);
            return ResponseEntity.ok(animals);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/animals/feeding/{fedToday}")
    public ResponseEntity<List<Animal>> getAnimalsByFeedingStatus(@PathVariable boolean fedToday) {
        try {
            List<Animal> animals = animalService.getAnimalsByFeedingStatus(fedToday);
            return ResponseEntity.ok(animals);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/animals/search")
    public ResponseEntity<List<Animal>> searchAnimals(@RequestParam(required = false) String location,
                                                     @RequestParam(required = false) String term) {
        try {
            List<Animal> animals;
            if (location != null && !location.isEmpty()) {
                animals = animalService.searchAnimalsByLocation(location);
            } else if (term != null && !term.isEmpty()) {
                animals = animalService.searchAnimalsByNameOrBreed(term);
            } else {
                animals = animalService.getAllAnimals();
            }
            return ResponseEntity.ok(animals);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/animals/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable Long id) {
        try {
            animalService.deleteAnimal(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}